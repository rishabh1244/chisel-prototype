import {
  IconGitCommit,
  IconMapPin,
  IconPlayerPlay,
} from "@tabler/icons-react";

export default function VerificationCard() {
  return (
    <div className="mx-auto max-w-[380px] overflow-hidden rounded-xl border border-[#2C2620] bg-[#1A1714]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#2C2620] px-4 py-3">
        <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#C2884A]">
          <IconGitCommit size={13} className="text-[#2A1B0C]" />
        </div>

        <span className="text-sm font-medium text-[#F4EFE7]">
          Chisel
        </span>

        <span className="ml-auto rounded-full bg-[#D9A33D]/15 px-2 py-1 text-[11px] font-medium text-[#D9A33D]">
          Pending
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-[15px] font-medium text-[#F4EFE7]">
          Rebar tied — east footing, grid C3–C5
        </h3>

        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-[#5D89A6]/15 px-2 py-1 text-[11px] font-medium text-[#5D89A6]">
            Structural
          </span>

          <span className="text-xs text-[#A39A8C]">
            Riverside block 4 · 2h ago
          </span>
        </div>

        {/* Video Preview */}
        <div className="relative mb-4 flex h-[140px] items-center justify-center rounded-lg bg-[#14110F]">
          <IconPlayerPlay size={26} className="text-[#5C5347]" />

          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/45 px-2 py-1 text-[11px] text-[#D7D2C8]">
            <IconMapPin size={11} />
            geo-tagged · 0:42
          </span>
        </div>

        {/* Crew */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex">
            {["SP", "MJ", "+1"].map((person, index) => (
              <div
                key={person}
                className={`
                  flex h-[22px] w-[22px]
                  items-center justify-center
                  rounded-full border-[1.5px]
                  border-[#1A1714]
                  bg-[#332C24]
                  text-[11px]
                  text-[#F4EFE7]
                  ${index !== 0 ? "-ml-1.5" : ""}
                `}
              >
                {person}
              </div>
            ))}
          </div>

          <span className="text-xs text-[#A39A8C]">
            3 crew on-site attested
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="
              flex-1 rounded-lg
              border border-[#3A332B]
              py-2 text-sm
              font-medium text-[#A39A8C]
              transition hover:bg-[#2C2620]
            "
          >
            Request Changes
          </button>

          <button
            className="
              flex-1 rounded-lg
              bg-[#C2884A]
              py-2 text-sm
              font-medium text-[#2A1B0C]
              transition hover:bg-[#D09555]
            "
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

