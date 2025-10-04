import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { TbPencil } from "react-icons/tb";

export const Home = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="font-beanie text-8xl text-neutral-600">Nostalgia</h1>
        <p className="inline-flex items-center text-center text-neutral-400">
          Press
          <KbdGroup className="mx-2">
            <Kbd>Ctrl + E</Kbd>
          </KbdGroup>
          or click
          <Button type="button" variant="outline" size="sm" className="mx-2">
            <TbPencil />
          </Button>
          to start writing
        </p>
      </div>
    </div>
  );
};
