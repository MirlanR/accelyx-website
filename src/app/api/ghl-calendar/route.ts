import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { contactId, date, time, timezone, service, firstName, lastName, email } = await req.json();

    const ghlApiToken = process.env.NEXT_PUBLIC_GHL_API_TOKEN;
    const ghlApiUrl = process.env.NEXT_PUBLIC_GHL_API_BASE_URL;
    const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID;

    if (!ghlApiToken || !ghlApiUrl || !locationId) {
      return NextResponse.json(
        { error: 'Missing GoHighLevel configuration' },
        { status: 500 }
      );
    }

    // Parse date and time to create proper ISO datetime
    const [year, month, day] = date.split('-');
    const [timeStr] = time.split(' ');
    const [hours, minutes] = timeStr.split(':');

    // Create ISO datetime string (basic implementation - adjust timezone handling as needed)
    const eventDateTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`).toISOString();

    // Create calendar event in GoHighLevel
    const eventResponse = await fetch(`${ghlApiUrl}/calendars/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        contactId,
        title: `Demo Request - ${service}`,
        description: `Booking for ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\nTimezone: ${timezone}`,
        startTime: eventDateTime,
        endTime: new Date(new Date(eventDateTime).getTime() + 60 * 60000).toISOString(), // 1 hour duration
        isAllDay: false,
      }),
    });

    if (!eventResponse.ok) {
      const error = await eventResponse.text();
      console.error('GHL Calendar event error:', error);
      return NextResponse.json(
        { error: 'Failed to create calendar event in GoHighLevel' },
        { status: eventResponse.status }
      );
    }

    const eventData = await eventResponse.json();

    return NextResponse.json({
      success: true,
      eventId: eventData.id,
      message: 'Calendar event created successfully in GoHighLevel',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
