type RootLayoutProps = {
  CanvasControls: React.ElementType;
};

function RootLayout({ CanvasControls }: RootLayoutProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] xl:grid-cols-[2fr_1fr] py-16 px-4 xl:px-16">
      <div>CANVAS SLOT</div>
      <CanvasControls />
    </div>
  );
}

export default RootLayout;
