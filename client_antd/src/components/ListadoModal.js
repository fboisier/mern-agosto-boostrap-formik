import React from 'react'
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';


export const ListadoModal = ({usuarios,eliminarUsuario}) => {


    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre'
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            key: 'apellido'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text, record) => (<>
                <Link to={`/registromodal/${record.id}`}><Button>Editar</Button></Link>
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
            defaultPageSize: 10,
            pageSizeOptions : ['10', '15', '20'], 
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