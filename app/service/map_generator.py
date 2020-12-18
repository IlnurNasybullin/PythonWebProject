import folium
from app.models import get_universities

def generate():
    f = folium.Figure(width=1000, height=1000)
    m = folium.Map([55.792365, 49.121841], zoom_start=12, tiles="OpenStreetMap").add_to(f)

    for university in get_universities():
        pp= folium.Html('<a href="'+ university.href+'"target="_blank">'+ university.university + ' '
                        + university.institute + '</a>', script=True)
        popup = folium.Popup(pp, max_width=2650)
        folium.Marker(location=[university.latitude, university.longitude], popup=popup, icon=folium.Icon(color=university.color)).add_to(m)


    m.save('app/templates/review.html')
    print('generated')