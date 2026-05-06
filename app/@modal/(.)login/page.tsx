import LoginForm from '@/app/components/LoginForm';

export default function LoginInterceptedModal() {
  return (
    <div className="modal-overlay">
      <div className="modal-content relative">
        <LoginForm isModal={true} />
      </div>
    </div>
  );
}
