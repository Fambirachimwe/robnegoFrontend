import React from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import Swal from 'sweetalert2'
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Card,
    Container,
} from '@mantine/core';
import { login } from './util/api';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';


const Login = (props) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            phoneNumber: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
            phoneNumber: (val) => (/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(val) ? null : 'Invalid phoneNumber')
        },
    });

    const handleSubmit = (values) => {
        console.log(values.email)
        if (type === "login") {
            login(values.email, values.password).then(data => {
                if (data.response.status === 401) {
                    Swal.fire({
                        icon: 'Error',
                        title: 'Auth failed',
                        text: 'username or password is incorrect',
                        // footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            })
        }
    }

    return (

        <Container size="sm" px="xs">
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    Welcome to Robnego Dashboard, {type}
                </Text>

                <Group grow mb="md" mt="md">
                    {/* <GoogleButton radius="xl">Google</GoogleButton>
                <TwitterButton radius="xl">Twitter</TwitterButton> */}
                </Group>

                <Divider label="" labelPosition="center" my="lg" />




                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    {/* {
                        console.log(form.values)
                    } */}
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        {
                            type === 'register' && (<TextInput
                                required
                                label="Phone"
                                placeholder="078 888 8888"
                                value={form.values.phoneNumber}
                                onChange={(event) => form.setFieldValue('phoneNumber', event.currentTarget.value)}
                                error={form.errors.phoneNumber && 'Invalid phoneNumber'}
                            />)
                        }

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button onClick={() => handleSubmit(form.values)} type="submit">{upperFirst(type)}</Button>
                    </Group>
                </form>
            </Paper>

        </Container>

    );
}

export default Login
