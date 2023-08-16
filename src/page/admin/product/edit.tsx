import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, message } from 'antd';
import { useAddProductMutation, useEditProductMutation, useGetProductByIdQuery } from '../../../api/product';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';



type FieldType = {
    name?: string;
    desc?: string;
    quantity: number;
    origin: string
};

const AdminProductEdit: React.FC = () => {
    const [form] = Form.useForm()
    const [editProduct] = useEditProductMutation()
    const navigate = useNavigate()
    const [messageApi, contextHoulder] = message.useMessage()
    const { idProduct } = useParams<{ idProduct: string }>()
    const { data: productData } = useGetProductByIdQuery(idProduct || "")

    useEffect(() => {
        form.setFieldsValue(productData)
    }, [productData])
    const onFinish = (values: any) => {
        editProduct({ ...values, id: idProduct }).unwrap().then(() => messageApi.open({
            type: 'success',
            content: "Sửa thành công, chuyển trang admin sau 3s"
        }))


        setTimeout(() => {
            navigate('/admin')
        }, 3000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <header>
                <h1 className='text-2xl'>Sửa sản phẩm</h1>
            </header>
            {contextHoulder}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' },
                    { min: 3, message: "Tôi thiểu 3 ký tự" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mô tả sản phẩm"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your username!' },
                    { min: 3, message: "Tôi thiểu 3 ký tự" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Please input your username!' },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Xuất xứ"
                    name="origin"
                    rules={[{ required: true, message: 'Please input your username!' },
                    { min: 3, message: "Tôi thiểu 3 ký tự" }]}
                >
                    <Input />
                </Form.Item>




                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" danger>
                        Submit
                    </Button>
                    <Button type='primary' danger className='ml-4'>Quay lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default AdminProductEdit;
