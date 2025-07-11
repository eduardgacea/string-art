type RootLayoutProps = {
  CanvasControls: React.ElementType;
};

function RootLayout({ CanvasControls }: RootLayoutProps) {
  return (
    <div>
      <CanvasControls />
    </div>
  );
}

export default RootLayout;
