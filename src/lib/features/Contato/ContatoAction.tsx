import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { AppDispatch } from '../../store';
import { setLoading, setError, setSuccess, resetForm } from './ContatoSlice';

interface FormData {
  nome: string;
  email: string;
  tipo: string;
  mensagem: string;
}

export const handleSubmitContato = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      
      const now = new Date();
      const dataFormatada = now.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo'
      }).replace(',', ' às');

      const contatosRef = collection(db, 'contatos');
      await addDoc(contatosRef, {
        ...formData,
        dataCadastro: `${dataFormatada} UTC-3`
      });

      dispatch(setSuccess(true));
      dispatch(resetForm());
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      dispatch(setError('Erro ao enviar mensagem'));
      return { success: false };
    } finally {
      dispatch(setLoading(false));
    }
  };
};
