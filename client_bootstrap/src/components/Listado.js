
import React from 'react'
import { Table } from 'react-bootstrap'

export const Listado = ({ datos }) => {
    return (
        <div>
            <Table striped bordered hover size="sm">


                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map(dato => (

                        <tr key={dato._id}>
                            <td>{dato._id}</td>
                            <td>{dato.nombre}</td>
                            <td>{dato.apellido}</td>
                            <td>{dato.email}</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    )
}
