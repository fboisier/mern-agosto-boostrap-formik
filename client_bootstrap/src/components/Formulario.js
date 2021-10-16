import React from 'react'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormGroup, Button, Alert, Row, Col, FormLabel } from 'react-bootstrap';

export const Formulario = ({ejecutarSubmit, initialValues,titleButton}) => {


    const formSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre es requerido'),
        apellido: Yup.string()
            .required('El apellido es requerido'),
        email: Yup.string()
            .email('El email no es valido')
            .required('El email es requerido'),
        password: Yup.string()
            .required('La contraseña es requerida')
            .min(6, 'La contraseña debe tener al menos 6 caracteres'),
        confirmPassword: Yup.string()
            .required('La confirmación de la contraseña es requerida')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    })

    return (
        <div>

            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={ejecutarSubmit}
            >

                <Form>
                    <FormGroup>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field id="nombre" type="text" name="nombre" placeholder="Nombre" className="form-control" />
                        <ErrorMessage name="nombre" component={Alert} className="field-error mt-1 alert-danger" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="apellido">Apellido</FormLabel>
                        <Field type="text" name="apellido" placeholder="Apellido" className="form-control" />
                        <ErrorMessage name="apellido" component={Alert} className="field-error mt-1 alert-danger" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Field type="email" name="email" placeholder="Email" className="form-control" />
                        <ErrorMessage name="email" component={Alert} className="field-error mt-1 alert-danger" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="password">Contraseña</FormLabel>
                        <Field type="password" name="password" placeholder="Contraseña" className="form-control" />
                        <ErrorMessage name="password" component={Alert} className="field-error mt-1 alert-danger" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
                        <Field type="password" name="confirmPassword" placeholder="Confirmar contraseña" className="form-control" />
                        <ErrorMessage name="confirmPassword" component={Alert} className="field-error mt-1 alert-danger" />
                    </FormGroup>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className="d-grid gap-2">
                                <Button
                                    color='primary'
                                    className='mt-4'
                                    type='submit'
                                >
                                    {titleButton}
                                </Button>
                            </div>
                        </Col>
                    </Row>

                </Form>
                

            </Formik>
        </div>
    )
}
