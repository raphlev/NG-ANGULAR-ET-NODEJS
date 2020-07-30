import { PRIMENGPage } from './app.po';

describe('primeng App', () => {
  let page: PRIMENGPage;

  beforeEach(() => {
    page = new PRIMENGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
