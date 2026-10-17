// The account view (EDD-008 P1.3-P1.5; Q9: client-rendered, because the session cookie never reaches page paths).
// Copy is a functional placeholder for growth-designer (E5); the flow and the choices are what the gate reads.
import AccountView from "@/components/account/AccountView";

export const metadata = { title: "Your history — System 3", robots: { index: false } };

export default function AccountPage() {
  return <AccountView />;
}
