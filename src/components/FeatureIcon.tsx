import {
  BuildingIcon,
  CameraIcon,
  CheckIcon,
  ClipboardIcon,
  ClockIcon,
  HardHatIcon,
  HomeIcon,
  LayersIcon,
  PhoneIcon,
  PinIcon,
  RulerIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "@/components/icons";

const icons = {
  building: BuildingIcon,
  camera: CameraIcon,
  check: CheckIcon,
  clipboard: ClipboardIcon,
  clock: ClockIcon,
  hardhat: HardHatIcon,
  home: HomeIcon,
  layers: LayersIcon,
  phone: PhoneIcon,
  pin: PinIcon,
  ruler: RulerIcon,
  search: SearchIcon,
  shield: ShieldCheckIcon,
} as const;

export type FeatureIconName = keyof typeof icons;

/** Decorative icon badge; the adjacent heading or label carries the meaning. */
export default function FeatureIcon({
  name,
  small = false,
}: {
  name: FeatureIconName;
  small?: boolean;
}) {
  const Icon = icons[name];
  return (
    <span
      className={small ? "feature-icon feature-icon--sm" : "feature-icon"}
      aria-hidden="true"
    >
      <Icon size={small ? 22 : 32} />
    </span>
  );
}
