'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
// import { validateSSO } from '../store/features/sso/ssoThunk';
import { validateSSO } from '../store/features/sso/ssoThunk';
import Loader from '../components/Loader';

export default function SSOPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.sso);

  useEffect(() => {
    const token = params.get('token');
    const clientId = params.get('client_id');
    const env = params.get('env');

    if (!token || !clientId || !env) return;

    if (
      env !== process.env.NEXT_PUBLIC_SSO_ENV ||
      clientId !== process.env.NEXT_PUBLIC_SSO_CLIENT_ID
    ) return;

    dispatch(validateSSO({ token }));
  }, [params, dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth', JSON.stringify(user));
      router.replace('/home');
    }
  }, [user, router]);

  if (loading) return <Loader text="Validating SSO..." />;

  if (error) {
    return (
      <div className="error-box">
        <h3>SSO Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  return <p>Initializing SSO...</p>;
}
