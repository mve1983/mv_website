export default function isSmallDisplay(): boolean {
  console.log(window.screen.width )
  return window.screen.width < 421 ? true : false;
}
