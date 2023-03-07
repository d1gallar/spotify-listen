import { signOut } from "next-auth/react";
import useRefreshToken from "@/hooks/RefreshToken";

export default function AccessTokenError() {
  const isValidToken = useRefreshToken();

  return !isValidToken ? (
    <div className="absolute h-screen w-screen top-0 left-0 flex flex-row items-center justify-center bg-[#000000bb] z-100">
      <div className="flex flex-col justify-center items-center min-w-[20vw] w-fit bg-white rounded-lg p-6 gap-6 shadow-lg">
        <div className="flex flex-col justify-start items-start gap-2">
          <h5 className="font-bold tracking-tigher">Expired Token</h5>
          <p className="font-circular font-medium text-black ">
            Your session has expired. To continue <br></br>using this website,
            please log back in.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <button
            className="bg-spotify-green w-fit px-4 py-2 rounded-full text-black font-circular font-semibold text-center"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
