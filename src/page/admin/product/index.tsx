import { Button, Table } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';
import { IProduct } from '../../../interface/product';
type Props = {}
const AdminProduct = (props: Props) => {
    const { data: productData } = useGetProductsQuery()

    const dataSource = productData?.map((product: IProduct) => ({
        key: product.id,
        name: product.name,
        desc: product.desc,
        quantity: product.quantity,
        origin: product.origin
    }))

    const [removeProduct] = useRemoveProductMutation()

    const handleRemove = (id: number | string) => {
        const confirm = window.confirm('bạn có muốn xóa không')
        if (confirm) {
            removeProduct(id)
            alert("xóa thành công")
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin',
        },
        {
            title: "Action",
            render: ({ key: id }: { key: string | number }) => {
                return (
                    <div>
                        <Button><Link to={`/admin/product/${id}/edit`}>Sửa</Link></Button>
                        <Button type='primary' danger className='ml-4' onClick={() => handleRemove(id)}>Xóa</Button>
                    </div>
                )
            }
        }
    ];


    return (
        <div>
            <header className='flex item-center justify-between mb-4'>
                <h2 className='text-2xl'>Quản lý sản phẩm</h2>
                <Button type='primary' danger><Link to={'/admin/product/add'}>Thêm sản phẩm</Link></Button>
            </header>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default AdminProduct