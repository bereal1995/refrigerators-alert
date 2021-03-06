import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {stateApp} from "../../../redux/app/appSlice";
import {Button, DatePicker, Form, Input, InputNumber, Popconfirm, Table, Typography} from "antd";
import moment from "moment";
import {DeleteOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {useHistory} from "react-router";
import {PATH_ITEM_LIST} from "../../../constants/ConstantsPath";
import {stateProduct} from "../../../redux/product/productSlice";
import actionsProduct from "../../../redux/product/productActions";

function ItemListContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = {...useSelector(stateApp)}.user;
    const list = {...useSelector(stateProduct)}.itemList;
    const [word, setWord] = useState('');
    const [data, setData] = useState([]);
    const listType = 'itemList';
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => ( a.name < b.name ) ? -1 : ( a.name === b.name ) ? 0 : 1,
            editable: true,
            fixed: 'left',
        },
        {
            title: 'Enter',
            dataIndex: 'enter',
            sorter: (a, b) => moment(a.enter) - moment(b.enter),
        },
        {
            title: 'Expire',
            dataIndex: 'expire',
            render: (_, record) =>
              <DatePicker
                onChange={(date, dateString) => onChangeDate(date, dateString, record.key)}
                defaultValue={moment(record.expire)}
              />
            ,
            sorter: (a, b) => moment(a.expire) - moment(b.expire),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable
                  ? (
                    <span>
                        <span onClick={() => save(record.key)} style={{marginRight: 8,}} className={'a-tag'}>
                          Save
                        </span>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <span className={'a-tag'}>Cancel</span>
                        </Popconfirm>
                    </span>
                  )
                  : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                  );
            },
        },
        {
            title: 'Del',
            dataIndex: 'delete',
            render: (_, record) =>
              data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                    <Button><DeleteOutlined /></Button>
                </Popconfirm>
              ) : null,
        },
    ];

    const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
              {editing ? (
                <Form.Item
                  name={dataIndex}
                  style={{margin: 0,}}
                  rules={[
                      {required: true, message: `Please Input ${title}!`,},
                  ]}
                >
                    {inputNode}
                </Form.Item>
              ) : (
                children
              )}
          </td>
        );
    };

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);

        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        dispatch(actionsProduct.updateListItem({
            userUid: user?.uid ? user.uid : 'guest',
            key: Object.keys(list).find(key => list[key] === item),
            path: 'name',
            data: newData[index].name,
            listType
        }))
        setEditingKey('');
    };

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onChangeDate = (date, dateString, key) => {
        for(let item of data) {
            if (item.key === key) {
                return dispatch(actionsProduct.updateListItem({
                    userUid: user?.uid ? user.uid : 'guest',
                    key: Object.keys(list).find(key => list[key] === item),
                    path: 'expire',
                    data: date.format(),
                    listType
                }))
            }
        }
    }

    const handleDelete = (item) => {
        dispatch(actionsProduct.updateListItem({
            userUid: user?.uid ? user.uid : 'guest',
            key: Object.keys(list).find(key => list[key] === item),
            path: '',
            data: null,
            listType
        }))
    };

    const onChange = (e) => {
        setWord(e.target.value);
    }

    const onSearch = (name) => {
        if (!name || name === '') {
            setData(Object.values(list));
            return history.push(PATH_ITEM_LIST);
        } else {
            history.push(PATH_ITEM_LIST+`?${name}`);
            setData(Object.values(list).filter(item => item.name.includes(name)));
        }
    }

    const addExpiredClass = (record, index) => {
        if(moment(record.expire).valueOf() < moment().valueOf()) return 'row-expired-active'
    }


    useEffect(() => {
        if (list) {
            setData(Object.values(list));
        } else {
            setData([]);
        }
    }, [list])

    return (
      <>
          <Search
            placeholder="????????? ????????? ?????????"
            enterButton
            onSearch={onSearch}
            onChange={onChange}
            value={word}
          />
          <Form form={form} component={false} className={'table'}>
              <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowClassName={addExpiredClass}
                columns={mergedColumns}
                dataSource={data}
                scroll={{ x: true }}
              />
          </Form>
      </>
    )
}

export default ItemListContainer;