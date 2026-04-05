import { weddingData } from "@/data/weddingData";
import { Cover } from "@/components/Cover";
import { InvitationCard } from "@/components/InvitationCard";
import { InvitationInfoSection } from "@/components/InvitationInfoSection";
import { AboutStorySection } from "@/components/AboutStorySection";
import { DateCountdownSection } from "@/components/DateCountdownSection";
import { Location } from "@/components/Location";
import { VenueGuide } from "@/components/VenueGuide";
import { RSVP } from "@/components/RSVP";
import { Gift } from "@/components/Gift";
import { Gallery } from "@/components/Gallery";
import { ShareActions } from "@/components/ShareActions";
import { CongratsBoard } from "@/components/CongratsBoard";
import { StarDivider } from "@/components/StarDivider";
import { RsvpReminderPopup } from "@/components/RsvpReminderPopup";
import { BgmPlayer } from "@/components/BgmPlayer";

export default function Page() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] space-y-2 bg-[#f6f0e6] px-3 py-4 shadow-[0_14px_38px_rgba(66,51,35,0.16)]">
      <Cover src={weddingData.coverGif} alt={weddingData.shareTitle} />
      <StarDivider />
      <section id="invitation">
        <InvitationCard
          invitationMessage={weddingData.invitationMessage}
        />
        <InvitationInfoSection lines={weddingData.simpleWeddingInfo} />
      </section>
      <StarDivider />
      <section id="about-story">
        <AboutStorySection
          items={weddingData.storyItems}
          groomBrideImage={weddingData.groomBrideImage}
          groomBrideImageWidth={weddingData.groomBrideImageWidth}
          groomBrideImageHeight={weddingData.groomBrideImageHeight}
          parents={{
            groom: weddingData.parentsIntro.groom,
            bride: weddingData.parentsIntro.bride,
          }}
        />
      </section>
      <StarDivider />
      <section id="date-countdown">
        <DateCountdownSection
          dateIso={weddingData.date}
          namesLabel={`${weddingData.groom.name} ❤️ ${weddingData.bride.name}`}
        />
      </section>
      <StarDivider />
      <section id="location">
        <Location
          venueName={weddingData.venueName}
          address={weddingData.address}
          addressDetail={weddingData.addressDetail}
          mapLat={weddingData.mapLat}
          mapLng={weddingData.mapLng}
        />
      </section>
      <StarDivider />
      <section id="venue-guide">
        <VenueGuide guides={weddingData.venueGuides} />
      </section>
      <StarDivider />
      <section id="rsvp">
        <RSVP />
      </section>
      <StarDivider />
      <section id="gift">
        <Gift accounts={weddingData.accounts} />
      </section>
      <StarDivider />
      <section id="gallery">
        <Gallery snaps={weddingData.gallerySnaps} />
      </section>
      <StarDivider />
      <section id="guestbook">
        <CongratsBoard />
      </section>
      <StarDivider />
      <footer id="share" className="pb-4">
        <ShareActions
          shareTitle={weddingData.shareTitle}
          shareDescription={weddingData.shareDescription}
          imageUrl={weddingData.shareImageUrl || undefined}
        />
      </footer>
      <RsvpReminderPopup reminder={weddingData.rsvpReminder} />
      <BgmPlayer
        src={`/audio/${encodeURIComponent("105 - The Black Skirts.mp3")}`}
      />
    </main>
  );
}
