import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Button } from 'antd'
import axios from 'axios';
import { Listado } from '../components/Listado'

import Swal from 'sweetalert2'
import { useParams } from 'react-router';
import { FormularioModal } from '../components/FormularioModal';
import { ListadoModal } from '../components/ListadoModal';

const { Title } = Typography;

export const RegistroModal = () => {

    let { id } = useParams();


    const [isModalVisible, setIsModalVisible] = useState(false);

    const [usuarios, setUsuarios] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [inicialData, setInicialData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const cargarUsuarios = async () => {

        try {
            const resultado = await axios.get('http://localhost:8000/api/usuario');
            setUsuarios(resultado.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    const cargarUnUsuario = async (idUsuario) => {
        setLoaded(false);

        console.log(idUsuario);

        if (id !== undefined) {
            const res = await axios.get(`http://localhost:8000/api/usuario/${idUsuario}`);
            setInicialData({ ...res.data, password: "", confirmPassword: "" });
            showModal();
        }
        else {
            await setInicialData({
                nombre: "",
                apellido: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        }

        setLoaded(true);
    }

    useEffect(() => {
        cargarUsuarios();
    }, [])

    useEffect(() => {
        cargarUnUsuario(id);
    }, [id])


    const crearUsuario = async (values) => {
        console.log(values)
        let todobien = true;

        try {
            const res = await axios.post('http://localhost:8000/api/usuario', values)
            console.log(res)
            Swal.fire({
                title: 'Exito',
                text: 'Todo Bien',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                setUsuarios([...usuarios, res.data]);

            })

        } catch (error) {
            todobien = false;
            console.log(error.response.data.message)
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {

            return todobien;
        }
    }

    const actualizarUsuario = async (values) => {
        let todobien = true;
        console.log(values)
        const idActualizar = id;


        try {
            const res = await axios.put(`http://localhost:8000/api/usuario/${idActualizar}`, values)
            console.log(res)
            Swal.fire({
                title: 'Exito',
                text: 'Todo Bien',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                console.log("RESETEANDO")
                setUsuarios(usuarios.map(usuario => usuario._id === idActualizar ? res.data : usuario));
            })

        } catch (error) {
            console.log(error.response.data.message)
            todobien = false;
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
        finally {
            return todobien;
        }
    }

    const eliminarUsuario = (id) => {



        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.value) {
                console.log(id)
                axios.delete(`http://localhost:8000/api/usuario/${id}`)
                    .then(res => {
                        console.log(res)
                        Swal.fire(
                            'Eliminado!',
                            'El usuario ha sido eliminado.',
                            'success'
                        )
                        setUsuarios(usuarios.filter(usuario => usuario._id !== id))
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire(
                            'Error!',
                            'No se pudo eliminar el usuario.' + err,
                            'error'
                        )

                    })
            }
        })
    }



    const showModal = () => {
        setIsModalVisible(true);
    };



    return (
        <div>



            <Row gutter={[48, 24]}>
                {loaded
                    ?
                    <FormularioModal
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                        ejecutarSubmit={id !== undefined ? actualizarUsuario : crearUsuario}
                        initialValues={inicialData}
                        titleButton={id !== undefined ? "Actualizar" : "Crear"}
                    />
                    : null}

                <Col md={24} lg={24} >
                    <Title>Listado</Title>
                    <Button type="primary" onClick={showModal}>
                        Agregar Usuario
                    </Button>
                    <hr />
                    <ListadoModal usuarios={usuarios} eliminarUsuario={eliminarUsuario} />
                </Col>

            </Row>

        </div>
    )
}
