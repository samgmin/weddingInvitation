import { weddingData } from "@/data/weddingData";
import { Cover } from "@/components/Cover";
import { InvitationScene } from "@/components/InvitationScene";
import { GroomBrideSection } from "@/components/GroomBrideSection";
import { ParentsSection } from "@/components/ParentsSection";
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
    <main className="mx-auto min-h-screen w-full max-w-[480px] space-y-0 bg-[#f6f0e6] px-3 pb-4 pt-0 shadow-[0_14px_38px_rgba(66,51,35,0.16)]">
      <Cover
        src={weddingData.coverGif}
        alt={weddingData.shareTitle}
        width={weddingData.coverImageWidth}
        height={weddingData.coverImageHeight}
      />
      <InvitationScene
        invitationMessage={weddingData.invitationMessage}
        simpleWeddingInfo={weddingData.simpleWeddingInfo}
      />
      <section id="groom-bride" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#d2a7a7]">
        <div className="px-8 py-5">
          <GroomBrideSection
            image={weddingData.groomBrideImage}
            imageWidth={weddingData.groomBrideImageWidth}
            imageHeight={weddingData.groomBrideImageHeight}
          />
        </div>
      </section>
      <section id="parents" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f6eee6]">
        <ParentsSection
          groom={weddingData.parentsIntro.groom}
          bride={weddingData.parentsIntro.bride}
        />
      </section>
      <section id="about-story" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f3e7de]">
        <AboutStorySection
          items={weddingData.storyItems}
        />
      </section>
      <section id="date-countdown" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#efe3d9]">
        <DateCountdownSection
          dateIso={weddingData.date}
          namesLabel={`${weddingData.groom.name} ❤️ ${weddingData.bride.name}`}
        />
      </section>
      <section id="location" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f3eadf]">
        <Location
          venueName={weddingData.venueName}
          address={weddingData.address}
          addressDetail={weddingData.addressDetail}
          mapLat={weddingData.mapLat}
          mapLng={weddingData.mapLng}
        />
      </section>
      <StarDivider />
      <section id="venue-guide" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f3eadf]">
        <VenueGuide guides={weddingData.venueGuides} />
      </section>
      <StarDivider />
      <section id="rsvp" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f3eadf]">
        <RSVP />
      </section>
      <StarDivider />
      <section id="gift" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f3eadf]">
        <Gift accounts={weddingData.accounts} />
      </section>
      <section id="gallery" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#efe4d8]">
        <Gallery snaps={weddingData.gallerySnaps} />
      </section>
      <section id="guestbook" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f4ebdf]">
        <CongratsBoard />
      </section>
      <footer id="share" className="-mx-3 w-[calc(100%+1.5rem)] bg-[#f5ecdf] pb-4">
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
