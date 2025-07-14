type RootLayoutProps = {
  Canvas: React.ElementType;
  CanvasControls: React.ElementType;
  FilePicker: React.ElementType;
};

function RootLayout({ Canvas, CanvasControls, FilePicker }: RootLayoutProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-y-8 py-16 px-2 xl:px-16">
      <div className="flex items-center justify-center">
        <Canvas />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center xl:items-stretch xl:justify-start">
        <CanvasControls className="w-full max-w-[512px] xl:max-w-full" />
        <FilePicker className="w-full max-w-[512px] xl:max-w-full" />
      </div>
    </div>
  );
}

export default RootLayout;
