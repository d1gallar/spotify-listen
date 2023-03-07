"use client";
import { usePathname } from "next/navigation";
import ProfileToggleProvider from "@/hooks/ProfileToggle";
import ExpandedSongProvider from "@/hooks/ExpandedSong";
import DeviceToggleProvider from "@/hooks/DeviceToggle";
import CurrentTrackProvider from "@/hooks/CurrentTrack";
import PopUpToggleProvider from "@/hooks/PopUpToggle";
import TimePeriodProvider from "@/hooks/TimePeriod";
import PlaybackProvider from "@/hooks/Playback";
import DeviceProvider from "@/hooks/Device";
import Notifications from "@/components/Notifications";
import AccessTokenError from "@/components/AccessToken";
import DashboardTop from "@/components/DashboardTop";
import DeviceBox from "@/components/DeviceBox";
import Sidebar from "@/components/Sidebar";
import CurrentPlaylistProvider from "@/hooks/CurrentPlaylist";

export type DashboardLayoutPaths =
  | "/dashboard"
  | "/stats"
  | "/liked"
  | "/songs"
  | "/artists"
  | "/albums";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const dashboardPath = pathname as DashboardLayoutPaths;
  return (
    <>
      <PopUpToggleProvider>
        <ProfileToggleProvider>
          <DeviceToggleProvider>
            <ExpandedSongProvider>
              <TimePeriodProvider>
                <CurrentTrackProvider>
                  <PlaybackProvider>
                    <DeviceProvider>
                      <CurrentPlaylistProvider>
                        <div className="w-screen min-h-screen">
                          <div className="flex flex-row w-full h-[100vh] bg-[#121212]">
                            {/* <div className="flex flex-row w-full h-[90vh]"> // TODO: revert to original if playback*/}
                            <Sidebar path={dashboardPath} />
                            <div
                              className={
                                "w-full h-full flex flex-col justify-start overflow-y-scroll"
                              }
                            >
                              <DashboardTop />
                              {children}
                            </div>
                          </div>
                          <Notifications />
                          {/* <NowPlayingBar /> */}
                          <DeviceBox />
                          <AccessTokenError />
                        </div>
                      </CurrentPlaylistProvider>
                    </DeviceProvider>
                  </PlaybackProvider>
                </CurrentTrackProvider>
              </TimePeriodProvider>
            </ExpandedSongProvider>
          </DeviceToggleProvider>
        </ProfileToggleProvider>
      </PopUpToggleProvider>
    </>
  );
}
