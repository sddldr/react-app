import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import { logOut } from '~/routes/login/authApi';
import { useSafeNavigate } from '~/utils/navigation';

export default function Header() {
  const { navigate } = useSafeNavigate();
  const handleLogOut = async () => {
    await logOut();
    navigate('/login/Login', { replace: true });
  };
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-bold">JieLi</h1>

        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-black"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-black"
          >
            About
          </a>
          <Button>
            <Link to="/login/Login">Login</Link>
          </Button>
          <Button>
            <Link to="/login/Register">Register</Link>
          </Button>
          <Button onClick={handleLogOut}>Logout</Button>
        </nav>
      </div>
    </header>
  );
}
