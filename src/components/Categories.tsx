import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table, Tag } from "antd";
import { Category, CategoryForm } from "../types/category";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCategory, getCategories } from "../store/actions/categoryActions";
import { SketchPicker } from "react-color";

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black"
};

function Categories() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {}, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    // Mode değerine göre create or update creator fonksiyonu çağır
    dispatch(addCategory(form));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      }
    }
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   )
    // }
  ];

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>
        <Modal
          title={mode === "new" ? "Create New Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !form.name }}>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Category Name">
              <Input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue="expense"
                onChange={(type) => setForm({ ...form, type })}>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
