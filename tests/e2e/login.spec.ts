import {
  test,
  expect
} from '../../fixtures/test.fixture';


test('user should login successfully', async ({
  loginPage
}) => {

  await loginPage.open();

  await loginPage.login(
    'customer@practicesoftwaretesting.com',
    'welcome01'
  );

  await loginPage.validateLoginSuccess();

});