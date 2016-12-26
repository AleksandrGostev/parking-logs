import { ParkingPage } from './app.po';

describe('parking App', function() {
  let page: ParkingPage;

  beforeEach(() => {
    page = new ParkingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
