import { useMedplum, useMedplumContext } from '@medplum/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignOutPage(): null {
  const medplum = useMedplum();
  const auth = useMedplumContext();
  const navigate = useNavigate();

  useEffect(() => {
    auth.medplum.signOut().then(()=> navigate("/"));
  }, [medplum,auth]);

  

  return null;
}
