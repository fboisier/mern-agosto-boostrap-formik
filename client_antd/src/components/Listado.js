import React from 'react'
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { uniqueArrayData } from "../helpers/uniqueArrayData";

export const Listado = ({usuarios,eliminarUsuario}) => {


    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            sortDirections: ['descend', 'ascend'],
            filters: uniqueArrayData(usuarios, "nombre").map(nombre => ({text: nombre, value: nombre})),


            onFilter: (value, record) => record.nombre.indexOf(value) === 0,
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            sorter: (a, b) => a.apellido.localeCompare(b.apellido),
            key: 'apellido'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            key: 'email'
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text, record) => (<>
                <Link to={`/registro/${record.id}`}><Button>Editar</Button></Link>
                <Button type="primary" danger className="ml-3" onClick={() => eliminarUsuario(record.id)}>Eliminar</Button>
              </>
            )
        },


    ];

    const data = usuarios?.map(usuario => ({
        key: usuario._id,
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
    }));

    const config = { 
        pagination : {
            defaultPageSize: 4,
            pageSizeOptions : ['4', '6', '9'], 
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : total => `En total son ${total} registros`
        }
    }

    return (
        <>
            <Table columns={columns} dataSource={data} {...config}/>
        </>
    )
}
