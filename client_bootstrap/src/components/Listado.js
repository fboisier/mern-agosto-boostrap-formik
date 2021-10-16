
import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Listado = ({ datos, eliminarUsuario }) => {
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
                            <td>
                                <Link to={`/registro/${dato._id}`}>
                                    {dato._id}
                                </Link>
                                </td>
                            <td>{dato.nombre}</td>
                            <td>{dato.apellido}</td>
                            <td>{dato.email}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarUsuario(dato._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                            
                            
                        </tr>

                    ))}
                </tbody>
            </Table>
        </div>
    )
}
