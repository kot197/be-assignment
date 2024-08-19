<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="login-form">
        <span class="title">Login/Register</span>
        <Form class="form" @submit="onSubmit">
            <Field name="email" type="email" placeholder="Enter email" :rules="validateEmail"/>
            <ErrorMessage name="email" class="error-message"/>
            <Field name="password" type="password" placeholder="Enter password" :rules="validatePassword"/>
            <ErrorMessage name="password" class="error-message"/>
            <span>No account? <RouterLink to='/register'>Sign Up Here</RouterLink></span>
            <button class="button">Login</button>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import axios from 'axios'
import * as yup from 'yup'

export default {
    data() {
        return {
            username: '',
            validatePassword: yup.string().min(8).required(),
            validateEmail: yup.string().required().email(),
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    methods: {
        onSubmit(values) {
            axios.post('http://localhost:3000/login', {
                email: values['email'],
                password: values['password']
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
};
</script>

<style scoped>
.title {
    font-weight: bold;
    font-size: 5rem;
  }

.form {
    display: flex;
    flex-direction: column;
}
</style>