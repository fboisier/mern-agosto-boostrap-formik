import React, { useEffect, useState } from 'react'
import { Formulario } from '../components/Formulario'
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Listado } from '../components/Listado';
import { useParams } from "react-router-dom";

export const Registro = () => {



    const [usuarios, setUsuarios] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [inicialData, setInicialData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {

            const resultado = await axios.get('http://localhost:8000/api/usuario');
            setUsuarios(resultado.data);


        }
        fetchData();

    }, []);

    useEffect(() => {
        async function fetchData() {

            setLoaded(false);

            console.log(id);

            if (id !== undefined) {
                const res = await axios.get(`http://localhost:8000/api/usuario/${id}`);
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
        fetchData();
    }, [id]);

    const crearUsuario = async (values, { resetForm }) => {
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

    const actualizarUsuario = async (values, { resetForm }) => {
        console.log(values)
        const idActualizar = values._id;
        delete values._id;

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
            Swal.fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    const eliminarUsuario = (id) => {
        
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
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
            <Row>
                <Col md={5}>
                    <h1>Registro</h1>
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
                <Col md={7}>
                    <h1>Listado</h1>
                    <hr />
                    <Listado datos={usuarios} eliminarUsuario={eliminarUsuario} />
                </Col>
            </Row>

        </div>
    )
}
