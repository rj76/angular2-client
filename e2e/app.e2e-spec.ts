import { My24serviceClientPage } from './app.po';

describe('my24service-client App', function() {
  let page: My24serviceClientPage;

  beforeEach(() => {
    page = new My24serviceClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
