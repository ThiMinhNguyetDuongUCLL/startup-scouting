from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count
from startups.models import Startup
from watchlist.models import WatchlistItem
from notes.models import Note


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analytics_dashboard(request):
    """
    Get analytics data for the authenticated user's watchlist and notes
    """
    user = request.user
    
    # Get user's watchlist startups
    watchlist_startup_ids = WatchlistItem.objects.filter(user=user).values_list('startup_id', flat=True)
    watchlist_startups = Startup.objects.filter(id__in=watchlist_startup_ids)
    
    # Get user's noted startups
    noted_startup_ids = Note.objects.filter(user=user).values_list('startup_id', flat=True)
    noted_startups = Startup.objects.filter(id__in=noted_startup_ids)
    
    # Industry analytics
    industry_counts = watchlist_startups.values('industry').annotate(count=Count('id')).order_by('-count')
    industry_data = [{'industry': item['industry'], 'count': item['count']} for item in industry_counts]
    
    # Location analytics
    location_counts = watchlist_startups.values('location').annotate(count=Count('id')).order_by('-count')
    location_data = [{'location': item['location'], 'count': item['count']} for item in location_counts]
    
    # Stage analytics
    stage_counts = watchlist_startups.values('stage').annotate(count=Count('id')).order_by('-count')
    stage_data = [{'stage': item['stage'], 'count': item['count']} for item in stage_counts]
    
    # Overall statistics
    total_startups = Startup.objects.count()
    user_watchlist_count = watchlist_startups.count()
    user_notes_count = noted_startups.count()
    
    # Most popular industries globally
    global_industry_counts = Startup.objects.values('industry').annotate(count=Count('id')).order_by('-count')[:10]
    global_industry_data = [{'industry': item['industry'], 'count': item['count']} for item in global_industry_counts]
    
    # Most popular locations globally
    global_location_counts = Startup.objects.values('location').annotate(count=Count('id')).order_by('-count')[:10]
    global_location_data = [{'location': item['location'], 'count': item['count']} for item in global_location_counts]
    
    return Response({
        'user_stats': {
            'watchlist_count': user_watchlist_count,
            'notes_count': user_notes_count,
            'total_startups_available': total_startups,
        },
        'user_analytics': {
            'industries': industry_data,
            'locations': location_data,
            'stages': stage_data,
        },
        'global_analytics': {
            'industries': global_industry_data,
            'locations': global_location_data,
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def watchlist_export(request):
    """
    Export user's watchlist as CSV
    """
    user = request.user
    watchlist_items = WatchlistItem.objects.filter(user=user).select_related('startup')
    
    # Create CSV data
    csv_data = []
    csv_data.append([
        'Startup Name',
        'Industry',
        'Location',
        'Stage',
        'Website',
        'Description',
        'Tags',
        'Added to Watchlist'
    ])
    
    for item in watchlist_items:
        startup = item.startup
        csv_data.append([
            startup.name,
            startup.industry,
            startup.location,
            startup.stage,
            startup.website or '',
            startup.description,
            ', '.join(startup.tag_list),
            item.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])
    
    # Convert to CSV string
    import csv
    import io
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerows(csv_data)
    csv_string = output.getvalue()
    output.close()
    
    from django.http import HttpResponse
    
    response = HttpResponse(csv_string, content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="watchlist_{user.username}_{request.user.id}.csv"'
    
    return response