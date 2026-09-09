import { Module, Controller, Post, Get, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Body() body: any) {
    return {
      success: true,
      message: 'Account created successfully',
      token: 'jwt_token_mock_12345',
      user: { id: 'usr_01', name: body.name || 'Rohan Mehta', email: body.email || 'rohan@vedicthreads.in' },
    };
  }

  @Post('login')
  async login(@Body() body: any) {
    return {
      success: true,
      token: 'jwt_token_mock_12345',
      user: { id: 'usr_01', name: 'Rohan Mehta', email: body.email || 'rohan@vedicthreads.in', plan: 'Growth' },
    };
  }

  @Get('me')
  async getProfile() {
    return {
      id: 'usr_01',
      name: 'Rohan Mehta',
      email: 'rohan@vedicthreads.in',
      businessName: 'Vedic Threads Pvt Ltd',
      plan: 'Growth',
      connectedPlatforms: ['amazon', 'flipkart', 'meesho', 'shopify'],
    };
  }
}

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
