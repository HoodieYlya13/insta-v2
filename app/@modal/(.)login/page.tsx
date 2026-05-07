import LoginForm from '@/app/components/LoginForm';
import ModalDismissOverlay from '@/app/components/ModalDismissOverlay';

export default function LoginInterceptedModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalDismissOverlay />
      <div className="modal-content relative z-10">
        <LoginForm isModal={true} />
      </div>
    </div>
  );
}
