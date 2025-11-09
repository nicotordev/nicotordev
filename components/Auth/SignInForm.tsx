'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from '@/app/actions/auth.actions';
import { createSignInSchema, type SignInFormData } from '@/lib/schemas/auth.schemas';
import { toast } from 'sonner';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations('auth');
  const router = useRouter();

  const signInSchema = createSignInSchema(t as (key: string, params?: Record<string, unknown>) => string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    
    try {
      const result = await signIn(data.email, data.password);
      
      if (result.success) {
        toast.success(t('signIn.success'));
        router.push('/');
        router.refresh();
      } else {
        if (result.error === 'User not found') {
          setError('email', { message: t('signIn.errors.userNotFound') });
        } else if (result.error === 'Invalid password') {
          setError('password', { message: t('signIn.errors.invalidPassword') });
        } else {
          toast.error(result.error || t('signIn.errors.generic'));
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(t('signIn.errors.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{t('signIn.title')}</CardTitle>
        <CardDescription className="text-center">
          {t('signIn.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('fields.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('fields.emailPlaceholder')}
              autoComplete="email"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('fields.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('fields.passwordPlaceholder')}
                autoComplete="current-password"
                {...register('password')}
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('signIn.submit')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">{t('signIn.noAccount')} </span>
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('signIn.signUpLink')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 
