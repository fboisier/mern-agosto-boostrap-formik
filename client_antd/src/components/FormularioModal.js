import React, { createRef } from 'react'
import { Form, Input, Button, Modal } from 'antd';
import { useHistory, useParams } from 'react-router';

export const FormularioModal = ({ ejecutarSubmit, initialValues, titleButton, setIsModalVisible, isModalVisible }) => {

    const formRef = createRef();
    const { id } = useParams();
    const history = useHistory(); // para hacer uso de historial y redirigir

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const limpiarFormulario = () => {

        formRef.current.resetFields();
    }

    const limpiarButton = () => {
        // al aplicar 2 veces un !, si el id trae un valor al aplicar ! daría falso y con otro ! daría verdadero.
        //                         sino  trae un valor al aplicar ! daría verdadero y otro ! daria falso.
        if (!!id) { // en resumen, si existe valor entrará.
            history.push("/registro/"); // si existe ID es mejor redirigido a registro. asi limpia incluso el formulario.
        } else {
            limpiarFormulario(); // sino, quiere decir que es un limpiar normal. dejar como estaba en blanco.
        }
    };

    const runSubmit = async (values) => {

        // como ahora ejecutar retorna si le fue bien o no, solo limpiará si fue bien
        const res = await ejecutarSubmit(values)
        console.log(res);
        if (res) {
            limpiarFormulario();
            handleCancel();
        }
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        limpiarFormulario();
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button form="myForm" htmlType="submit" key="submit"  type="primary" >
                        {titleButton}
                    </Button>
                ]}
            >



                <Form
                    id="myForm"
                    name="usuario"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={runSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    ref={formRef}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{
                            required: true, message: 'Por favor ingresar nombre'
                        },
                        {
                            min: 3, message: 'El nombre debe tener al menos 3 caracteres'
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                        name="apellido"
                        rules={[{ required: true, message: 'por favor ingresar apellido' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'por favor ingresar email'
                            },
                            {
                                type: 'email',
                                message: 'el email no es válido',
                            },]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: 'por favor ingresar contraseña' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirmar Contraseña"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las contraseñas deben coincidir.'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                   
                </Form>

            </Modal>
        </>
    )
}
