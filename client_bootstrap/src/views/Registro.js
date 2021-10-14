import React, { useEffect, useState } from 'react'
import { Formulario } from '../components/Formulario'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Listado } from '../components/Listado';

export const Registro = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:8000/api/usuario').then(res => {
            setUsuarios(res.data);
        })

    }, [])

    const crearUsuario = async (values, {resetForm}) => {
        console.log(values)

        try {
            const res = await axios.post('http://localhost:8000/api/usuario', values)
            console.log(res)
            Swal.fire({
                title: 'Exito',
                text: 'Todo Bien',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                console.log("RESETEANDO")
                resetForm();
                setUsuarios([...usuarios, res.data]);
            })

        } catch (error) {
            console.log(error.response.data.message)
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    return (
        <div>
            <Row>
                <Col md={5}>
                    <h1>Registro</h1>
                    <hr />
                    <Formulario ejecutarSubmit={crearUsuario} />
                </Col>
                <Col md={7}>
                    <h1>Listado</h1>
                    <hr />
                    <Listado datos={usuarios} />
                </Col>
            </Row>

        </div>
    )
}
