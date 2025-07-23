import { InvitationLink } from './InvitationLink';
import { Join } from './Join';

export const HomeMobile = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <InvitationLink />
      <Join />
    </div>
  );
};
