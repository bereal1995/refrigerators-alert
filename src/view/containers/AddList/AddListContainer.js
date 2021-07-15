import React, {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {DeleteOutlined, HighlightOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, InputNumber, Popconfirm, Table, Typography} from "antd";
import moment from "moment";

function AddListContainer() {
    const [word, setWord] = useState('');
    const [data, setData] = useState([
        {
            key: '1',
            name: 'John Brown',
            enter: moment().format('YYYY-MM-DD'),
            expire: moment(),
        },
        {
            key: '2',
            name: 'Jim Green',
            enter: moment().format('YYYY-MM-DD'),
            expire: moment(),
        },
        {
            key: '3',
            name: 'Joe Black',
            enter: moment().format('YYYY-MM-DD'),
            expire: moment(),
        },
    ]);
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
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
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
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => ( a.name < b.name ) ? -1 : ( a.name === b.name ) ? 0 : 1,
            editable: true,
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
                defaultValue={record.expire}
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
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button><DeleteOutlined /></Button>
                </Popconfirm>
              ) : null,
        },
    ];
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const onChangeDate = (date, dateString, key) => {
        setData(data.map(item => {
            if (item.key === key) {
                item.expire = date
            }
            return item
        }));
    }

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
    };

    const onChange = (e) => {
        setWord(e.target.value);
    }

    const onCreate = (name) => {
        if (!name) return;

        setData([
            ...data,
            {
                key: data.length + 2,
                name: name,
                enter: moment().format('YYYY-MM-DD'),
                expire: moment(),
            },
        ]);

        setWord('');
    }

    useEffect(() => {
        console.log('data',data);
    }, [data])

    return (
      <>
          <Search
            placeholder="추가할 이름을 입력해 주세요"
            enterButton={<HighlightOutlined />}
            onSearch={onCreate}
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
                // expandable={{
                //     expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                //     rowExpandable: record => record.description,
                // }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={mergedColumns}
                dataSource={data}
              />
          </Form>
      </>
    )
}

export default AddListContainer;