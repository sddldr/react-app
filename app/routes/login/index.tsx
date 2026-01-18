
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';
import { useSafeNavigate } from '~/utils/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { register, login } from './authApi';

const formSchema = z.object({
  email: z.string().min(2, { message: 'Email must be at least 2 characters.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function Login() {
  const { type: paramType } = useParams();
  const [type, setType] = useState(''); // 默认空字符串，避免 SSR mismatch
  const [loading, setLoading] = useState(false);
  const { navigate } = useSafeNavigate();

  useEffect(() => {
    setType(paramType || '');
  }, [paramType]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (type === 'Register') {
        const res = await register({
          email: values.email,
          password: values.password,
        });
        console.log('Registration successful:', res);
      } else {
        await login({
          email: values.email,
          password: values.password,
        });
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto mt-32 w-full max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 border rounded-md p-8"
        >
          <div className="text-xl font-bold text-center">{type}</div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" type="submit" disabled={loading}>
            {loading && <Spinner className="mr-2" />}
            {loading ? 'Submitting…' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
