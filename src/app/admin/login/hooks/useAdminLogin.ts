import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/adminService';
import { useUserStore } from '@/store/useUserStore';
import { notify } from '@/lib/notifications';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function useAdminLogin() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginSchema) => adminService.login(data),
    onSuccess: (response: any) => {
      // Robust handling of both direct and wrapped API responses
      const tokenData = response.data || response;
      const accessToken = tokenData.access || tokenData.token;
      const refreshToken = tokenData.refresh;
      const userData = tokenData.user || tokenData;

      if (userData.role !== 'admin') {
        notify.error(
          'Access Denied',
          'Only administrators can access this portal.'
        );
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', accessToken || 'mock-token');
        localStorage.setItem('adminRefreshToken', refreshToken || '');
        localStorage.setItem('adminUser', JSON.stringify(userData));
      }

      setUser(userData);

      notify.success('Login Successful', 'Welcome back to the desk.');

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    },
    onError: (error: any) => {
      notify.error(
        'Login Failed',
        error.message || 'Invalid credentials. Please try again.'
      );
      console.error('Login error:', error);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}
