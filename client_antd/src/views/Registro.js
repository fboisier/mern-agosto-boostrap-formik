import React, { useEffect, useState } from 'react'
import { Row, Col, Typography } from 'antd'
import axios from 'axios';
import { Listado } from '../components/Listado'
import { Formulario } from '../components/Formulario';
import Swal from 'sweetalert2'
import { useParams } from 'react-router';

const { Title } = Typography;

export const Registro = () => {

    let { id } = useParams();


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


    return (
        <div>

            <Row gutter={[48, 24]}>
                <Col md={24} lg={8}>
                    <Title>Registro</Title>
                    <hr />
                    {loaded
                        ?
                        <Formulario
                            ejecutarSubmit={id !== undefined ? actualizarUsuario : crearUsuario}
                            initialValues={inicialData}
                            titleButton={id !== undefined ? "Actualizar" : "Crear"}
                        />
                        : <h1>Cargando...</h1>}
                </Col>
                <Col md={24} lg={16} >
                    <Title>Listado</Title>
                    <hr />
                    <Listado usuarios={usuarios} eliminarUsuario={eliminarUsuario} />
                </Col>
            </Row>

        </div>
    )
}
