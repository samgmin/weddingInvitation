import { weddingData } from "@/data/weddingData";
import { Cover } from "@/components/Cover";
import { Message } from "@/components/Message";
import { WeddingInfo } from "@/components/WeddingInfo";
import { Couple } from "@/components/Couple";
import { Parents } from "@/components/Parents";
import { Story } from "@/components/Story";
import { Gallery } from "@/components/Gallery";
import { RSVP } from "@/components/RSVP";
import { Countdown } from "@/components/Countdown";
import { Notice } from "@/components/Notice";
import { Location } from "@/components/Location";
import { Gift } from "@/components/Gift";
import { ShareActions } from "@/components/ShareActions";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-xl space-y-4 px-4 py-4">
      <Cover
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
        dateLabel={weddingData.dateLabel}
        image="/hero.svg"
      />
      <Message lines={weddingData.invitationMessage} />
      <WeddingInfo
        date={weddingData.dateLabel}
        time={weddingData.timeLabel}
        venue={weddingData.venueName}
      />
      <Couple groom={weddingData.groom} bride={weddingData.bride} />
      <Parents
        groomParents={weddingData.parents.groom}
        brideParents={weddingData.parents.bride}
      />
      <Story items={weddingData.timeline} />
      <Gallery images={weddingData.gallery} />
      <RSVP />
      <Countdown dateIso={weddingData.date} />
      <Notice text={weddingData.notice} />
      <Location
        venueName={weddingData.venueName}
        address={weddingData.address}
        addressDetail={weddingData.addressDetail}
        mapLat={weddingData.mapLat}
        mapLng={weddingData.mapLng}
      />
      <Gift accounts={weddingData.accounts} />
      <ShareActions
        shareTitle={weddingData.shareTitle}
        shareDescription={weddingData.shareDescription}
        imageUrl={weddingData.shareImageUrl || undefined}
      />
    </main>
  );
}
