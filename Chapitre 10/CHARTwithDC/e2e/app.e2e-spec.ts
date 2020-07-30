import { ChartwithdcPage } from './app.po';

describe('chartwithdc App', () => {
  let page: ChartwithdcPage;

  beforeEach(() => {
    page = new ChartwithdcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
