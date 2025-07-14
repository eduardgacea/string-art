import FilePicker from "@/components/controls/FilePicker";

type RootLayoutProps = {
  CanvasControls: React.ElementType;
};

function RootLayout({ CanvasControls }: RootLayoutProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] py-16 px-2 xl:px-16">
      <div>CANVAS SLOT</div>
      <div className="flex flex-col gap-8 items-center justify-center xl:items-stretch xl:justify-start">
        <CanvasControls className="w-full max-w-[512px] xl:max-w-full" />
        <FilePicker className="w-full max-w-[512px] xl:max-w-full" />
      </div>
    </div>
  );
}

export default RootLayout;
