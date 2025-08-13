import type { UserDataProps } from '../../pages/Dashboard';
import { InvitationLink } from './InvitationLink';

export const HomeMobile = (props: { userData?: UserDataProps }) => {
  const { userData } = props;
  return (
    <div className="flex flex-col items-center w-full">
      <InvitationLink userData={userData} />
    </div>
  );
};
