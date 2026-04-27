import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, service, date, time, timezone } = await req.json();

    const ghlApiToken = process.env.NEXT_PUBLIC_GHL_API_TOKEN;
    const ghlApiUrl = process.env.NEXT_PUBLIC_GHL_API_BASE_URL;
    const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID;

    if (!ghlApiToken || !ghlApiUrl || !locationId) {
      return NextResponse.json(
        { error: 'Missing GoHighLevel configuration' },
        { status: 500 }
      );
    }

    // Create contact in GoHighLevel
    const endpoint = `${ghlApiUrl}/contacts?locationId=${locationId}`;

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      source: 'accelyx-website-booking',
      tags: [service, 'website-demo-request'],
    };

    console.log('GHL API Request:', { endpoint, locationId, payload });

    const contactResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await contactResponse.text();
    console.log('GHL API Response:', { status: contactResponse.status, body: responseText });

    if (!contactResponse.ok) {
      console.error('GHL Error:', responseText);
      return NextResponse.json(
        {
          error: 'Failed to create contact in GoHighLevel',
          details: responseText,
          status: contactResponse.status
        },
        { status: contactResponse.status }
      );
    }

    const contactData = JSON.parse(responseText);
    console.log('Contact created:', contactData);

    return NextResponse.json({
      success: true,
      contactId: contactData.id || contactData.contact?.id,
      message: 'Contact created successfully in GoHighLevel',
      data: contactData,
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
