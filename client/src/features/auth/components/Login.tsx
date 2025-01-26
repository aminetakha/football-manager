import { Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import classes from './Login.module.css';

const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#,;()$%^&*-/.])(?=.{8,})',
);
const emailRegex = new RegExp(
    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
);

const LogInForm: React.FC<{ onSubmit: (values: { email: string; password: string; }) => void }> = ({ onSubmit }) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (emailRegex.test(value) ? null : 'Please provide a valid email.'),
            password: value => (passwordRegex.test(value)? null : 'Password must have more than 8 characters with lower case, upper case, numbers, and symbols.')
        },
    });

    return (
        <form onSubmit={form.onSubmit(values => onSubmit(values))}>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key('email')}
                size='md'
                classNames={{ label: classes.label, input: classes.input }}
                {...form.getInputProps('email')}
            />
            <PasswordInput
                withAsterisk
                label="Password"
                key={form.key('password')}
                size='md'
                my='lg'
                classNames={{ label: classes.label, input: classes.input }}
                {...form.getInputProps('password')}
            />
            <Group justify="center">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default LogInForm