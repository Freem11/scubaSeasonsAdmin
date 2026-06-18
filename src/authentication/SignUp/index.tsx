import { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await register(data)

    if (response?.error?.message) {
      toast.error(response.error.message);
      return;
    }
  }

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
}
